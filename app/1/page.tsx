"use client";
import { useState, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import type { MouseEvent } from "react";
import { processImage } from "./process-image";

import "./page.css";

const COLORS = [
  "bg-red-500",
  "bg-orange-500",
  "bg-yellow-500",
  "bg-green-500",
  "bg-blue-500",
  "bg-indigo-500",
  "bg-purple-500",
  "bg-pink-500",
];

interface Friend {
  name: string;
  photo: any;
  color: (typeof COLORS)[number];
  thoughts: Array<string>;
}

export default function Page() {
  const dragRef = useRef(null);
  const fileInputRef = useRef(null);
  const [friends, setFriends] = useState<Array<Friend>>([]);

  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    let { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <>
      <div className="hidden bg-blue-500 bg-green-500 bg-indigo-500 bg-orange-500 bg-pink-500 bg-purple-500 bg-red-500 bg-rose-500 bg-yellow-500" />
      <div className="page" onMouseMove={handleMouseMove}>
        <motion.div className="friends outline-none" ref={dragRef}>
          {friends.map((friend, index) => (
            <motion.div
              key={friend.name}
              className="friend group w-[300px]"
              // whileHover={{ scale: 1.1 }}
              // whileTap={{ scale: 0.9 }}
              whileDrag={{ scale: 0.95 }}
              drag
              dragConstraints={dragRef}
              dragElastic={0.2}
            >
              {/* <Tilt
                glareEnable={true}
                glareMaxOpacity={0.75}
                glarePosition="all"
                glareBorderRadius="5px"
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                perspective={750}
                scale={1.0625}
              > */}
              <img
                src={
                  friend.photo instanceof Blob
                    ? URL.createObjectURL(friend.photo)
                    : friend.photo
                }
                alt={friend.name}
                draggable={false}
                // width={148 * 2}
                // height={185 * 2}
                width={256}
                height={256}
                className="rounded-xl shadow-xl"
              />
              {/* </Tilt> */}
              {/* <h3 className='font-bold mt-2'>{friend.name}</h3> */}
              <ul
                className="relative -mt-4 ml-6"
                // style={{ marginLeft: COLORS.indexOf(friend.color) * 8 }}
              >
                {friend.thoughts.map((thought, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 10 }}
                    className={`${friend.color} mb-1 w-[256px] rounded-lg px-3 py-2 text-white first:rounded-t-2xl`}
                  >
                    {thought}
                  </motion.li>
                ))}
                <input
                  type="text"
                  className="border-1 w-[256px] rounded-lg bg-white p-2 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  onKeyUp={(e) => {
                    // add thought when you press enter
                    if (e.key === "Enter") {
                      setFriends([
                        ...friends.slice(0, index),
                        {
                          ...friends[index],
                          thoughts: [
                            ...friends[index].thoughts,
                            e.currentTarget.value,
                          ],
                        },
                        ...friends.slice(index + 1),
                      ]);
                      e.currentTarget.value = "";
                    }
                  }}
                />
              </ul>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-xl transition duration-300"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                100px circle at ${mouseX}px ${mouseY}px,
                rgba(255, 255, 255, 0.25),
                transparent 80%
              )
            `,
          }}
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={async (e) => {
            const file = e.currentTarget.files?.[0];
            console.log(file);
            if (file) {
              const reader = new FileReader();
              reader.onload = async (e) => {
                const photo = await processImage(file);
                setFriends((f) => [
                  ...f,
                  {
                    // name: new Date().toISOString(),
                    name: file.name.split(".")[0],
                    photo,
                    thoughts: [],
                    color: COLORS[Math.floor(Math.random() * COLORS.length)],
                  },
                ]);
              };
              reader.readAsDataURL(file);
            }
          }}
          className="hidden"
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="addFriend fixed bottom-4 right-4 rounded-full bg-rose-500 p-2 text-white shadow-2xl"
          onClick={() => {
            // @ts-expect-error click is a function
            fileInputRef.current?.click();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width={48}
            height={48}
            fill="currentColor"
          >
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
          </svg>
        </motion.button>
      </div>
    </>
  );
}
