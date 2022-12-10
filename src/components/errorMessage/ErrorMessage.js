import img from './giphy.gif'

const ErrorMessage = () => {
    return (
        <img src={img} style={{width: 250, height: 250}} alt='img not found' />
        //<img src={process.env.PUBLIC_URL + '/giphy.gif'} alt='img not found' />
    )
}

export default ErrorMessage;