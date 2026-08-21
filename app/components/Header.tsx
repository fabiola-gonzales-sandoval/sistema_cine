"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Header() {
    return (
        <header className="w-full bg-gray-900 text-white absolute inset-x-0 top-0 z-50 flex justify-between px-10 py-5">
            <div>
                <h2>Panel de Administracion</h2>
            </div>
            <div className="flex gap-10">
                <Link href="/">Home</Link>
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/dashboard/profile">Perfil</Link>
                <Link href="/dashboard/projects">Proyectos</Link>
                <Link href="/dashboard/tasks">Tareas</Link>
                <Link href="/dashboard/users">Usuarios</Link>
            </div>
            <div>
                <Link href={"/login"}>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} style={{color: "#FFF",}} />
                </Link>
            </div>
        </header>
    )
}