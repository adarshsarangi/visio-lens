from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from typing import List
from torchvision import transforms
import torch.nn.functional as F
import torch
from PIL import Image
import torchvision.models as models
import pickle

app = FastAPI()

origins = ["*", "http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

with open("vgg16.pkl", "rb") as pickle_file:
    list_of_features = pickle.load(pickle_file)

vgg16 = models.vgg16(pretrained=True)
vgg16 = torch.nn.Sequential(*list(vgg16.features.children())[:-2])
vgg16.eval()
preprocess = transforms.Compose(
    [
        transforms.Resize(224),
        transforms.CenterCrop(224),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
    ]
)


def getfeatures(image_path, features):
    image = Image.open(image_path)
    print(type(image))
    image = np.asarray(image)
    if len(image.shape) < 3:
        image = np.expand_dims(image, axis=0)

    image = Image.fromarray(image)
    # image = cv2.cvtColor(image, cv2.COLOR_GRAY2RGB)
    # print(image_path)
    processed_image = preprocess(image).unsqueeze(0)
    # print(processed_image.shape)
    vgg16 = models.vgg16(pretrained=True)
    with torch.no_grad():
        flattened_tensor = vgg16(processed_image).view(-1)
        features.append((image_path, flattened_tensor))


@app.get("/")
async def main():
    return {"message": "Hello World"}


@app.post("/visual-search")
async def find_closest_image(
    image: UploadFile, left: int, top: int, right: int, bottom: int
):
    # target_image = image.target_image
    # print()
    # return image
    file_location = f"uploads/{image.filename}"
    with open(file_location, "wb+") as file_object:
        file_object.write(image.file.read())

    # return {"info": f"file '{input_data.filename}' saved at '{file_location}'"}
    im = Image.open(file_location)
    im.crop((left, top, right, bottom))
    pre_sear = preprocess(im).unsqueeze(0)
    with torch.no_grad():
        flattened_searched = vgg16(pre_sear).view(-1)
    simi = []
    for i in list_of_features:
        tensor1 = F.normalize(i[1].float(), p=2, dim=0)
        tensor2 = F.normalize(flattened_searched.float(), p=2, dim=0)
        cos_sim = torch.dot(tensor1, tensor2)
        simi.append((i[0], cos_sim))
    fin_list = []
    for i in simi:
        fin_list.append((i[0], float(i[1])))
    fin_list = sorted(fin_list, key=lambda x: x[1], reverse=True)[1:12]
    return fin_list
