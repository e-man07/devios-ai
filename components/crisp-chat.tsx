"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
    useEffect(() => {
        Crisp.configure("2a0ca3fa-a599-413a-a1b3-670567be4151")
    }, []);

    return null;
}