import React from 'react';

const Modal = ({active, setActive, children, postReview, handleChangeReview}) => {
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