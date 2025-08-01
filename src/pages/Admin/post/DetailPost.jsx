// import React, { useState } from 'react'
// import './DetailPost.scss'
// import image from '../../../assets/images/image.png'
// import { FaRegThumbsUp, FaRegCommentDots } from 'react-icons/fa'

// const comments = new Array(9).fill({
//   user: 'Trần Bảo Nam',
//   content: 'Thật đáng mong đợi. Hóng quá!!!!!',
//   time: 'Fri, Nov 28 • 12:30 PM',
//   avatar: 'https://i.pravatar.cc/40?img=12',
// })

// const PostDetail = () => {
//   const [action, setAction] = useState('like')
//   return (
//     <div className='post-h2'>
//       <h2>Chi tiết bài đăng của người dùng</h2>
//       <div className='post-detail'>
//         <div className='post-detail__main'>
//           <h3>Chào mừng cộng tác viên 2025</h3>
//           <p>
//             <strong>Người đăng:</strong> Hoàng Linh Khánh
//           </p>
//           <p>
//             <strong>Ngày đăng:</strong> 31/07/2025
//           </p>
//           <div className='post-detail__content'>
//             <p>
//               Đi từ đằng xa, mùi hương thơm của lúa chín đã ngào ngạt. Trước mắt em là cả một màu
//               vàng rực rỡ. Những bông lúa đang xì xào, đung đưa trong gió như mời gọi “này các bạn
//               nhỏ ơi hãy đến đây chơi cùng với chúng tớ nào”. Càng lại gần, vẻ đẹp của cánh đồng lúa
//               chín càng cuốn hút em. Lúa nghiêng mình tạo thành những đợt sóng. Lúa như đang múa,
//               một điều múa rất riêng. Đi từ đằng xa, mùi hương thơm của lúa chín đã ngào ngạt. Trước
//               mắt em là cả một màu vàng rực rỡ. Những bông lúa đang xì xào, đung đưa trong gió như
//               mời gọi “này các bạn nhỏ ơi hãy đến đây chơi cùng với chúng tớ nào”. Càng lại gần, vẻ
//               đẹp của cánh đồng lúa chín càng cuốn hút em. Lúa nghiêng mình tạo thành những đợt
//               sóng. Lúa như đang múa, một điều múa rất riêng.
//             </p>
//           </div>
//           <div className='image-wrapper'>
//             <img src={image} alt='post' />
//           </div>
//           {/* <div className='post-detail__reaction'>
//             <span>
//               <FaRegThumbsUp /> 23
//             </span>
//             <span>
//               <FaRegCommentDots /> 23
//             </span>
//           </div> */}
//         </div>
//         {/* <div className='post-detail__comments'>
//           {comments.map((c, i) => (
//             <div key={i} className='comment'>
//               <img src={c.avatar} alt='avatar' />
//               <div className='comment__info'>
//                 <p className='comment__name'>{c.user}</p>
//                 <p className='comment__text'>{c.content}</p>
//                 <p className='comment__time'>{c.time}</p>
//               </div>
//             </div>
//           ))}
//         </div> */}
//         <div className='reaction'>
//           <div className='reaction-action'>
//             <p onClick={setAction("like")}>
//               <span className={action === 'like' ? 'change' : ''}>Like</span>
//               <span>(23)</span>
//             </p>
//             <p onClick={setAction("comment")}>
//               <span className={action === 'comment' ? 'change' : ''}>Comment</span>
//               <span>(32)</span>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default PostDetail
import React, { useState } from 'react'
import './DetailPost.scss'
import image from '../../../assets/images/image.png'
const comments = new Array(9).fill({
  user: 'Trần Bảo Nam',
  content: 'Đi từ đằng xa, mùi hương thơm của lúa chín đã ngào ngạt. Trước mắt em là cả một màu vàng rực rỡ. Những bông lúa đang xì xào, đung đưa trong gió như mời gọi “này các bạn nhỏ ơi hãy đến đây chơi cùng với chúng tớ nào”. Càng lại gần, vẻ đẹp của cánh đồng lúa',
  time: 'Fri, Nov 28 • 12:30 PM',
  avatar: 'https://i.pravatar.cc/40?img=12',
})

const PostDetail = () => {
  const [action, setAction] = useState('like')

  return (
    <div className='post-h2'>
      <h2>Chi tiết bài đăng của người dùng</h2>
      <div className='post-detail'>
        <div className='post-detail__main'>
          <h3>Chào mừng cộng tác viên 2025</h3>
          <p>
            <strong>Người đăng:</strong> Hoàng Linh Khánh
          </p>
          <p>
            <strong>Ngày đăng:</strong> 31/07/2025
          </p>

          <div className='post-detail__content'>
            <p>
              Đi từ đằng xa, mùi hương thơm của lúa chín đã ngào ngạt. Trước mắt em là cả một màu
              vàng rực rỡ. Những bông lúa đang xì xào, đung đưa trong gió như mời gọi “này các bạn
              nhỏ ơi hãy đến đây chơi cùng với chúng tớ nào”. Càng lại gần, vẻ đẹp của cánh đồng lúa
              chín càng cuốn hút em. Lúa nghiêng mình tạo thành những đợt sóng. Lúa như đang múa,
              một điều múa rất riêng. Đi từ đằng xa, mùi hương thơm của lúa chín đã ngào ngạt. Trước
              mắt em là cả một màu vàng rực rỡ. Những bông lúa đang xì xào, đung đưa trong gió như
              mời gọi “này các bạn nhỏ ơi hãy đến đây chơi cùng với chúng tớ nào”. Càng lại gần, vẻ
              đẹp của cánh đồng lúa chín càng cuốn hút em. Lúa nghiêng mình tạo thành những đợt
              sóng. Lúa như đang múa, một điều múa rất riêng.
            </p>
          </div>

          <div className='image-wrapper'>
            <img src={image} alt='post' />
          </div>
        </div>
        <div className='reaction'>
          <div className='reaction-action'>
            <p onClick={() => setAction('like')}>
              <span className={action === 'like' ? 'change' : ''}>Like</span>
              <span>(23)</span>
            </p>
            <p onClick={() => setAction('comment')}>
              <span className={action === 'comment' ? 'change' : ''}>Comment</span>
              <span>(32)</span>
            </p>
          </div>
          {action === 'like' ? (
            <div className='reaction-likes'>
              {comments.map((c, i) => (
                <div key={i} className='like'>
                  <img src={c.avatar} alt='avatar' />
                  <div className='like__info'>
                    <p className='like__name'>{c.user}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='reaction-comments'>
              {comments.map((c, i) => (
                <div key={i} className='comment'>
                  <img src={c.avatar} alt='avatar' />
                  <div className='comment__info'>
                    <div>
                      <p className='comment__name'>{c.user}</p> 
                      <p className='comment__time'>{c.time}</p>
                    </div>
                    <p className='comment__text'>{c.content}</p>
                   
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PostDetail
