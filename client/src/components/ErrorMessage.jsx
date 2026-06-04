function ErrorMessage({ message }) {

    return (

        <div
            className="mt-6 p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg"
        >
            {message}
        </div>
    )
}


export default ErrorMessage;