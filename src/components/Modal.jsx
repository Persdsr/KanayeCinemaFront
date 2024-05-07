import React from 'react';
import axios from "axios";

const Modal = ({active, setActive, children, review, setReview}) => {
    async function postReview(e) {
        try {
            const res = await axios.post(`http://localhost:8080/api/send_review`, new Blob([JSON.stringify(review)], {type: 'application/json'}), {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            console.log(res)
        } catch (error) {
            console.log("Ошибка добавления коммента " + error)
        }
    }


    const handleChangeReview = (e) => {
        const {name, value, type} = e.target
        setReview((prevReview) => ({
                ...prevReview,
                [name]: value
            })
        )
    }

    return (
        <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
            <div className={active ? "modal__content active" : "modal__content"} onClick={e => e.stopPropagation()}>
                <form action="" onSubmit={(e) => postReview(e)}>
                    <input onChange={handleChangeReview} type="text" placeholder="title" name="title" id="title"/>
                    <textarea className="modal_fulltext" onChange={handleChangeReview} type="text" placeholder="text" name="text" id="text"/>
                    <label>Ваша оценка:
                        <select onChange={handleChangeReview} defaultValue="-" style={{width: "100%"}} name="review" id="review">
                            <option value="-">---</option>
                            <option value="POSITIVE">ТОП</option>
                            <option value="NEGATIVE">КАЛ</option>
                            <option value="NEUTRAL">НОРМ</option>
                        </select>
                    </label>
                    <button className="green_btn btn_bottom" type="submit">Отправить</button>
                </form>
            </div>
        </div>
    );
};

export default Modal;