/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Rnd } from "react-rnd";

interface Dot {
  width: number;
  height: number;
  x: number;
  y: number;
}

interface VisualSearchProps {
  image: {
    name: string;
    src: string;
    width: number;
    height: number;
  };
  dots: Dot[];
}

const transformDot = (dot: Dot) => {
  return {
    x: Math.floor(dot.x - dot.width / 2),
    y: Math.floor(dot.y - dot.height / 2),
    width: dot.width,
    height: dot.height,
  };
};

const VisualSearch = ({ image, dots }: VisualSearchProps) => {
  const [state, setState] = useState(
    dots.length > 0
      ? transformDot(dots[0]!)
      : {
          width: image.width - 20,
          height: image.height - 20,
          x: 10,
          y: 10,
        },
  );

  return (
    <div
      className="relative overflow-hidden rounded-xl"
      style={{
        width: image.width,
        height: image.height,
      }}
    >
      <img alt={image.name} src={image.src} />

      <div className="absolute inset-0 h-full w-full">
        <svg className="absolute inset-0 h-full w-full">
          <defs>
            <mask id="a">
              <rect width="100%" height="100%" fill="#fff" rx={0} ry={0} />
              <rect
                id="b"
                width={state.width}
                height={state.height}
                x={state.x}
                y={state.y}
                rx={0}
                ry={0}
              />
            </mask>
          </defs>
          <rect
            className="shadowMask"
            mask="url(#a)"
            width="100%"
            height="100%"
            style={{
              fill: "rgba(0,0,0,.5)",
            }}
          />
          <use
            fill="rgba(0,0,0,0)"
            stroke="#fff"
            strokeWidth={0}
            className="cropSection"
            href="#b"
            style={{
              cursor: "move",
            }}
          />
        </svg>
      </div>
      <div className="absolute inset-0 h-full w-full">
        <div className="relative inset-0 h-full w-full">
          {dots.map((dot, i) => (
            <div
              key={i}
              className="absolute z-10 h-3 w-3 rounded-full bg-white"
              style={{
                top: dot.y,
                left: dot.x,
              }}
              role="button"
              onClick={() => {
                setState(transformDot(dot));
              }}
            />
          ))}
        </div>
        <Rnd
          className="flex items-center justify-center rounded-lg border-2 border-white"
          bounds="parent"
          size={{
            width: state.width,
            height: state.height,
          }}
          position={{
            x: state.x,
            y: state.y,
          }}
          onDrag={(e, d) => {
            setState({ ...state, x: d.x, y: d.y });
          }}
          resizeHandleComponent={{
            topLeft: (
              <div className="relative h-full w-full">
                <div className="absolute left-[5px] top-[5px] h-5 w-5 rounded-tl-xl border-l-4 border-t-4 border-white" />
              </div>
            ),
            topRight: (
              <div className="relative h-full w-full">
                <div className="absolute right-[5px] top-[5px] h-5 w-5 rounded-tr-xl border-r-4 border-t-4 border-white" />
              </div>
            ),
            bottomRight: (
              <div className="relative h-full w-full">
                <div className="absolute bottom-[5px] right-[5px] h-5 w-5 rounded-br-xl border-b-4 border-r-4 border-white" />
              </div>
            ),
            bottomLeft: (
              <div className="relative h-full w-full">
                <div className="absolute bottom-[5px] left-[5px] h-5 w-5 rounded-bl-xl border-b-4 border-l-4 border-white" />
              </div>
            ),
          }}
          onResize={(e, direction, ref, delta, position) => {
            setState({
              width: ref.offsetWidth,
              height: ref.offsetHeight,
              ...position,
            });
          }}
        ></Rnd>
      </div>
    </div>
  );
};

export default VisualSearch;
