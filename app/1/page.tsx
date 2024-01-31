"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

import "./page.css";

interface Friend {
  name: string;
  photo: any;
  thoughts: Array<string>;
}

export default function Page() {
  const dragRef = useRef(null);
  const fileInputRef = useRef(null);
  const [friends, setFriends] = useState<Array<Friend>>([]);
  return (
    <>
      <div className="page">
        <motion.div className="friends" ref={dragRef}>
          {friends.map((friend, index) => (
            <motion.div
              key={friend.name}
              className="friend"
              // whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              drag
              dragConstraints={dragRef}
              dragElastic={0.2}
            >
              {/* <div className="rounded-lg shadow-xl m-4 w-[320px]"> */}
              <img
                src={
                  // render File object as URL
                  friend.photo instanceof File
                    ? URL.createObjectURL(friend.photo)
                    : friend.photo
                }
                alt={friend.name}
                draggable={false}
                width={148 * 3}
                height={185 * 3}
                className="rounded-xl shadow-xl"
              />
              {/* <h3 className='font-bold mt-2'>{friend.name}</h3> */}
              {/* </div> */}
              <ul>
                {friend.thoughts.map((thought, index) => (
                  <li key={index}>{thought}</li>
                ))}
              </ul>
              <input
                type="text"
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
            </motion.div>
          ))}
        </motion.div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => {
            const file = e.currentTarget.files?.[0];
            console.log(file);
            if (file) {
              const reader = new FileReader();
              reader.onload = (e) => {
                setFriends((f) => [
                  ...f,
                  {
                    name: new Date().toISOString(),
                    photo: file,
                    thoughts: [],
                  },
                ]);
              };
              reader.readAsDataURL(file);
            }
          }}
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="addFriend fixed bottom-4 right-4 rounded-full bg-red-500 p-2 text-white"
          onClick={() => {
            // const name = prompt("Friend name") ?? "New friend";
            // setFriends((f) => [
            //   ...f,
            //   {
            //     name,
            //     photo: "https://via.placeholder.com/150",
            //     thoughts: [],
            //   },
            // ]);
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
