import express from 'express';

const Middleware = () => {
    const init = (app) => {
        app.use(express.json());
    }
    return {
        init
    }
}
export default Middleware;

