// import React from 'react';
// import { Popover } from 'antd';

// const notesStatus = ({ status }) => {
//   const content = (
//     <div>
//       <p>Status: {status === 1 ? 'Disetujui' : status === 0 ? 'Ditolak' : 'Menunggu'}</p>
//       <p>Detail lebih lanjut bisa ditambahkan di sini.</p>
//     </div>
//   );

//   const renderStatusIcon = () => {
//     if (status === 1) {
//       return (
//         <svg className="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24">
//           <circle cx="12" cy="12" r="10" fill="#98D8AA" />
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" stroke="white" />
//         </svg>
//       );
//     }
//     if (status === 0) {
//       return (
//         <svg className="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24">
//           <circle cx="12" cy="12" r="10" fill="#FF6D60" />
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" stroke="white" />
//         </svg>
//       );
//     }
//     if (status === null) {
//       return (
//         <svg className="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24">
//           <circle cx="12" cy="12" r="10" fill="#F7D060" />
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01" stroke="white" />
//         </svg>
//       );
//     }
//     return null;
//   };

//   return (
//     <Popover content={content} title="Status Persetujuan">
//       <div>{renderStatusIcon()}</div>
//     </Popover>
//   );
// };

// export default notesStatus;