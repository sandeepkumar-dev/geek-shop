import { useState, useEffect } from "react";

function useRemoveFromCart({ token, id, dispatch }) {
    const [res, setRes] = useState({
        success: false,
        message: "",
    });

    useEffect(() => {
        fetch(`/cart/remove/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    dispatch({ type: "updateCart", payload: data.data });
                    setRes({
                        success: true,
                        message: data.message
                    });
                } else {
                    setRes({
                        success: false,
                        message: data.message
                    });
                }
            })
            .catch((err) => {
                setRes({
                    success: false,
                    message: "Error removing product from cart",
                });
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return res
}

export default useRemoveFromCart;