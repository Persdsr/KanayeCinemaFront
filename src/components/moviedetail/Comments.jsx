import React, {useState} from 'react';
import axios from "axios";

const Comments = ({movie, params, username}) => {

    const [comment, setComment] = useState({
        movieId: params.id,
        message: '',
        username: username
    })

    const handleChange = (e) => {
        const {name, value, type} = e.target
        setComment((prevComment) => ({
                ...prevComment,
                [name]: value
            })
        )
    }


    async function postComment(e) {
        try {
            const res = await axios.post("http://localhost:8080/add_comment", new Blob([JSON.stringify(comment)], {type: 'application/json'}), {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            console.log(res)
        } catch (error) {
            console.log("Ошибка добавления коммента " + error)
        }
    }

    return (
        <div className="block-comments">
            <div className="block-create-comment">
                <img className="comment-avatar"
                     src="https://tehcovet.ru/wp-content/uploads/2022/03/novobush-scaled.jpg" alt=""/>
                <form onSubmit={(e) => postComment(e)}>
                        <textarea onChange={handleChange} placeholder="Написать комментарий" className="comment-area"
                                  name="message" id="message"></textarea>
                    <button className="btn-create-comment">Отправить</button>
                </form>
            </div>
            {movie.comments ? movie.comments.map((comment) =>
                <div className="block-comment" key={comment.id}>
                    <img className="comment-avatar"
                         src="https://tehcovet.ru/wp-content/uploads/2022/03/novobush-scaled.jpg" alt=""/>
                    <div className="comment-info">
                        <div>{comment.author ? comment.author.username : 'Unknown User'}</div>
                        <div>{comment.message}</div>
                    </div>
                </div>
            ) : ""}

        </div>
    );
};

export default Comments;