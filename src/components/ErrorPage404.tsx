import { useNavigate } from "react-router";

import image from '../assets/page-found-error-404.jpg';

export default function ErrorPage404 () {
    const navigateHome = useNavigate();
    const handleClick = () => {
        navigateHome("/");
    };

    return (
        <div className="bg-white  w-full flex items-center flex-col pt-14 px-4">
            <img src={image} alt="error-404" className="w-80 h-80 object-contain" />
        <div className="flex flex-col items-center text-center max-w-md">
            <div className="pb-5">
                <h2 className="text-2xl font-serif text-red-600 mb-2">
                    Ваша страница не найдена!
                </h2>
                <p className="text-gray-600 font-serif">
                    Для перехода на домашнюю страницу нажмите кнопку ↓
                </p>
            </div>
            <button className="bg-gray-500 hover:bg-gray-600 py-2 px-6 text-white font-bold text-lg rounded-lg transition-colors duration-200"
                    onClick={handleClick}
                >
                Back to HomePage
            </button>
        </div>
        </div>
    );
};