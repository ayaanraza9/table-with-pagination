import React from 'react'
import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import _ from "lodash"
import axios from 'axios';

const pageSize = 5;

//npm i bootstrap
//npm i lodash
// npm axios


const UserList = () => {
    const [userList, setUserList] = useState([])
    const [paginationUser, setPaginationUSer] = useState()
    const [currentPage, setCurrentPage] = useState(1)


    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
            console.log(res.data);
            setUserList(res.data);
            setPaginationUSer(_(res.data).slice(0).take(pageSize).value());
        })
    }, [])
    const pagination = (pageNo) => {
        setCurrentPage(pageNo)
        const startIndex = (pageNo - 1) * pageSize;
        const paginationUser = _(userList).slice(startIndex).take(pageSize).value();
        setPaginationUSer(paginationUser)
    }

    const pageCount = userList ? Math.ceil(userList.length / pageSize) : 0
    if (pageCount === 1) return null;
    const pages = _.range(1, pageCount + 1)
    return (
        <div>
            {
                !paginationUser ? (
                    "No Data Found"
                ) : (
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>S.no</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Contact</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                paginationUser.map((user, ind) => (
                                    <tr key={ind}>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                )
            }

            <nav className='d-flex justify-content-center'>
                <ul className='pagination'>
                    {
                        pages.map((page) => (
                            <li className={
                                page === currentPage ? "page-item active" : "page-item"
                            }>
                                <p className='page-link' onClick={() => pagination(page)}>{page}</p>

                            </li>
                        ))
                    }
                </ul>
            </nav>
        </div>
    )
}

export default UserList