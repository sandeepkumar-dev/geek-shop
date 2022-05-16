const SignUp = (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
}

export default SignUp;