import React, { useState } from 'react';
import axios from 'axios';
import {useForm} from "react-hook-form"
import {useNavigate} from "react-router-dom";

const Create = () => {
    const [formData, setFormData] = useState({
        title: '',
        duration: '',
        description: '',
        fees: '',
        slogan: '',
        slugUrl: '',
        author: '',
        genres: [],
        MainMovieFile: null,
        Screenshots: [],
        Trailer: null,
        VerticalPoster: null,
        Poster: null,
        FullPoster: null,
    });


    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm({
        mode: "onBlur"
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        if (type === 'file') {
            if (name === "Screenshots") {
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    [name]: [...prevFormData[name], ...e.target.files],
                }));
            } else {
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    [name]: e.target.files[0],
                }));
            }
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }
    };


    const handlePostSubmit = async () => {
        const { genres, MainMovieFile, Poster, Screenshots, FullPoster, Trailer, VerticalPoster, ...restData } = formData;

        const MovieDetail = {
            ...restData,
            genres: genres.map((genre) => ({ title: genre })),
            author: localStorage.getItem("username"),
        };

        const formDataToSend = new FormData();
        formDataToSend.append('MovieDetail', new Blob([JSON.stringify(MovieDetail)], { type: 'application/json' }));
        formDataToSend.append('MainMovieFile', MainMovieFile, MainMovieFile.name);
        Screenshots.forEach((screenshot, index) => {
            formDataToSend.append(`Screenshots`, screenshot, screenshot.name); // Append each screenshot with an index
        });
        formDataToSend.append('Poster', Poster, Poster.name);
        formDataToSend.append('VerticalPoster', VerticalPoster, VerticalPoster.name);
        formDataToSend.append('FullPoster', FullPoster, FullPoster.name);
        formDataToSend.append('Trailer', Trailer, Trailer.name);

        try {
            const response = await axios.post('http://localhost:8080/api/add_movie', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            navigate("/", {state: "PRIVET"});
            window.location.reload()

        } catch (error) {
            console.error('Error adding movie:', error.response.data);
        }
    };

    return (
        <div className="auth-form-container">
            <form onSubmit={handleSubmit(handlePostSubmit)} encType="multipart/form-data">
                <input
                    {...register('title', { required: 'Поле обязательно к заполнению'})}
                    placeholder="Название"
                    type="text"
                    onChange={handleChange}
                />
                {errors.title && <p style={{color: "red"}}>{errors.title.message}</p>}
                <input
                    {...register('duration', {
                        required: 'Поле обязательно к заполнению',
                    })}
                    placeholder="Длительность"
                    type="number"
                    onChange={handleChange}
                />
                {errors.duration && <p style={{color: "red"}}>{errors.duration.message}</p>}

                <input
                    {...register('description', {
                        required: 'Поле обязательно к заполнению',
                    })}
                    placeholder="Описание"
                    type="text"
                    onChange={handleChange}
                />
                {errors.description && <p style={{color: "red"}}>{errors.description.message}</p>}

                <input {...register("fees", {required: "Поле обязательно к заполнению"})}
                    placeholder="Сборы"
                    type="number"
                    name="fees"
                    onChange={handleChange}/>
                {errors.fees && <p style={{color: "red"}}>{errors.fees.message}</p>}

                <input
                    {...register("slogan", {required: "Поле обязательно к заполнению"})}
                    placeholder="Слоган"
                    type="text"
                    name="slogan"
                    onChange={handleChange}/>
                {errors.slogan && <p style={{color: "red"}}>{errors.slogan.message}</p>}

                <input
                    {...register("slugUrl", {required: "Поле обязательно к заполнению"})}
                    placeholder="url"
                    type="text"
                    name="slugUrl"
                    onChange={handleChange}
                    />
                {errors.slugUrl && <p style={{color: "red"}}>{errors.slugUrl.message}</p>}

                <input
                    {...register("budget", {required: "Поле обязательно к заполнению"})}
                    placeholder="Бюджет"
                    type="text"
                    name="budget"
                    onChange={handleChange}
                />
                {errors.budget && <p style={{color: "red"}}>{errors.budget.message}</p>}

                <input
                    {...register("country", {required: "Поле обязательно к заполнению"})}
                    placeholder="Страна"
                    type="text"
                    name="country"
                    onChange={handleChange}
                />
                {errors.country && <p style={{color: "red"}}>{errors.country.message}</p>}

                <input
                    {...register("ageLimit", {required: "Поле обязательно к заполнению"})}
                    placeholder="Возрастное ограничение"
                    type="text"
                    name="ageLimit"
                    onChange={handleChange}
                />
                {errors.ageLimit && <p style={{color: "red"}}>{errors.ageLimit.message}</p>}

                <input
                    {...register("yearProduction", {required: "Поле обязательно к заполнению"})}
                    placeholder="Год производства"
                    type="text"
                    name="yearProduction"
                    onChange={handleChange}
                />
                {errors.yearProduction && <p style={{color: "red"}}>{errors.yearProduction.message}</p>}

                <input
                    {...register("datePremiere", {required: "Поле обязательно к заполнению"})}
                    placeholder="Дата премьеры"
                    type="date"
                    name="datePremiere"
                    onChange={handleChange}
                />
                {errors.datePremiere && <p style={{color: "red"}}>{errors.datePremiere.message}</p>}

                <label {...register('genres', { required: 'Выберите хотя бы один жанр' })}>
                    <select
                        name="genres"
                        multiple
                        onChange={(e) => {
                            const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
                            setFormData((prevFormData) => ({ ...prevFormData, genres: selectedOptions }));
                        }}
                    >
                        <option value="Боевик">Боевик</option>
                        <option value="Комедия">Комедия</option>
                    </select>
                </label>

                <label className="input-file">
                    <input multiple {...register('Screenshots', { required: 'Поле обязательно к заполнению' })} type="file" id="Screenshots" name="Screenshots" onChange={handleChange} />
                    <span className="input-file-btn">{formData.Screenshots.length > 0 ? (`Выбрано файлов: ${formData.Screenshots.length}`) : ("Скриншоты")}</span>
                </label>
                {errors.Screenshots && <p style={{ color: "red" }}>{errors.Screenshots.message}</p>}
                {/* Other input fields as before */}

                <label className="input-file">
                    <input {...register('MainMovieFile', { required: 'Поле обязательно к заполнению' })} type="file" id="MainMovieFile" name="MainMovieFile" onChange={handleChange}/>
                    <span className="input-file-btn">{formData.MainMovieFile ? (<p>{formData.MainMovieFile.name}</p>) : ("Файл фильма")}</span>
                </label>
                {errors.MainMovieFile && <p style={{color: "red"}}>{errors.MainMovieFile.message}</p>}

                <label className="input-file">
                    <input {...register('Trailer', { required: 'Поле обязательно к заполнению' })} type="file" id="Trailer" name="Trailer" onChange={handleChange}/>
                    <span className="input-file-btn">{formData.Trailer ? (<p>{formData.Trailer.name}</p>) : ("Трейлер")}</span>
                </label>
                {errors.Trailer && <p style={{color: "red"}}>{errors.Trailer.message}</p>}

                <label className="input-file">
                    <input {...register('Poster', { required: 'Поле обязательно к заполнению' })} type="file" id="Poster" name="Poster" onChange={handleChange}/>
                        <span className="input-file-btn">{formData.Poster ? (<p>{formData.Poster.name}</p>) : ("Файл постера")}</span>
                </label>
                {errors.Poster && <p style={{color: "red"}}>{errors.Poster.message}</p>}

                <label className="input-file">
                    <input {...register('VerticalPoster', { required: 'Поле обязательно к заполнению' })} type="file" id="VerticalPoster" name="VerticalPoster" onChange={handleChange}/>
                    <span className="input-file-btn">{formData.VerticalPoster ? (<p>{formData.VerticalPoster.name}</p>) : ("Файл вертикального постера")}</span>
                </label>
                {errors.VerticalPoster && <p style={{color: "red"}}>{errors.VerticalPoster.message}</p>}

                <label className="input-file">
                    <input {...register('FullPoster', { required: 'Поле обязательно к заполнению' })} type="file" id="FullPoster" name="FullPoster" onChange={handleChange}/>
                    <span className="input-file-btn">{formData.FullPoster ? (<p>{formData.FullPoster.name}</p>) : ("Файл полного постера")}</span>
                </label>
                {errors.FullPoster && <p style={{color: "red"}}>{errors.FullPoster.message}</p>}

                <button className="btn_createForm" type="submit" disabled={Object.keys(errors).length > 0}>Отправить</button>
            </form>
        </div>
    );
};

export default Create;