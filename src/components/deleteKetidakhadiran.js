import React, { useState } from "react";
import { Card } from "antd";

const deleteKetidakhadiran = ({ onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    onDelete();
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        className="group relative flex h-8 w-8 flex-col items-center justify-center overflow-hidden rounded-lg bg-red-400 hover:bg-red-600"
        style={{
          boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.123)",
          transition: "box-shadow 0.3s ease-in-out",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.boxShadow =
            "0px 5px 10px rgba(0, 0, 0, 0.336)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.boxShadow =
            "0px 5px 10px rgba(0, 0, 0, 0.123)")
        }
        onClick={() => setIsModalOpen(true)}
      >
        <svg
          viewBox="0 0 512 512"
          className="absolute -top-5 fill-white delay-100 group-hover:top-4 group-hover:animate-[spin_1.4s] group-hover:duration-1000"
          height="1em"
        >
          <path d="M.471 1.024v-.52a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099h-.39c-.107 0-.195 0-.195-.195"></path>
          <path d="M1.219.601h-.163A.1.1 0 0 1 .959.504V.341A.033.033 0 0 0 .926.309h-.26a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099v-.39a.033.033 0 0 0-.032-.033"></path>
          <path d="m1.245.465-.15-.15a.02.02 0 0 0-.016-.006.023.023 0 0 0-.023.022v.108c0 .036.029.065.065.065h.107a.023.023 0 0 0 .023-.023.02.02 0 0 0-.007-.016"></path>
        </svg>
        <svg
          width="12"
          fill="none"
          viewBox="0 0 39 7"
          className="origin-right duration-500 group-hover:rotate-90"
        >
          <line strokeWidth="4" stroke="white" y2="5" x2="39" y1="5"></line>
          <line
            strokeWidth="3"
            stroke="white"
            y2="1.5"
            x2="26.0357"
            y1="1.5"
            x1="12"
          ></line>
        </svg>
        <svg width="12" fill="none" viewBox="0 0 33 39">
          <mask fill="white" id="path-1-inside-1_8_19">
            <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"></path>
          </mask>
          <path
            mask="url(#path-1-inside-1_8_19)"
            fill="white"
            d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
          ></path>
          <path strokeWidth="4" stroke="white" d="M12 6L12 29"></path>
          <path strokeWidth="4" stroke="white" d="M21 6V29"></path>
        </svg>
      </button>

      {/* Modal Konfirmasi Hapus */}
      <dialog id="modal17" className="modal" open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Card
          title={<div className="flex justify-start w-full">Detail</div>}
          style={{
            width: "100%",
            maxWidth: 500,
          }}
          className="w-full md:max-w-md"
        >
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="p-2 flex flex-wrap">
            <h3 className="font-bold text-lg">Konfirmasi Hapus Pengajuan</h3>
            <p className="py-4">
              Apakah Anda yakin ingin menghapus pengajuan ini?
            </p>
          </div>
          <div className="modal-action justify-center">
          <button
              className="btn bg-green-600 text-white hover:bg-green-700 h-[40px]"
              onClick={handleDelete}
            >
              Ya, Hapus Sekarang
            </button>
            <button
              className="btn bg-red-600 text-white hover:bg-red-700 w-[90px] h-[40px]"
              onClick={() => setIsModalOpen(false)}
            >
              Tidak
            </button>
          </div>
        </Card>
      </dialog>
    </>
  );
};

export default deleteKetidakhadiran;
