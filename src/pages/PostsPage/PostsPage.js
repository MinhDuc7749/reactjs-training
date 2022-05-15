import React, { useState, useMemo, useEffect } from 'react';
import useSendGETAPI from '../../shared/hooks/useSendGETAPI/useSendGETAPI';
import { useTable, useSortBy } from 'react-table';
import { NavLink } from "react-router-dom";
import styled from 'styled-components'

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;



    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
    }
  }
`

function Table({ columns, data }) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
            columns,
            data,
        },
        useSortBy
    )

    return (
        <>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                // Add the sorting props to control sorting. For this example
                                // we can add them into the header props
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    {/* Add a sort direction indicator */}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? ' 🔽'
                                                : ' 🔼'
                                            : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(
                        (row, i) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return (
                                            <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        )
                                    })}
                                </tr>
                            )
                        }
                    )}
                </tbody>
            </table>
        </>
    )
}

const convertDataResponse = response => response.data;
const PostsPage = () => {
    
    const [searchText, setSearchText] = useState('');
    const { isLoading, data, errorMessage } = useSendGETAPI([], 'https://jsonplaceholder.typicode.com/posts', convertDataResponse);
    const posts = data;
    const postsFiltered = useMemo(() => {
        return posts.filter(post =>
          post.title.toLowerCase().includes(searchText.toLowerCase()))
      }, [posts, searchText]);
    const columns = useMemo(
        () => [
            {
                Header: "Id",
                accessor: "id",
                id: "id",
                disableSortBy: true,
            },
            {
                Header: "Title",
                accessor: "title",
                id: "title",
                width: 250,
            },
            {
                Header: "Action",
                id: "actions",
                disableSortBy: true,
                width: 100,
                Cell: ({ row }) => (
                    <div>
                        <NavLink
                            to={`/posts/${row.original.id}`}
                            style={{ marginRight: "7px" }}
                        >View Detail
                        </NavLink>
                        <button
                            onClick={() => {
                                console.log(posts);
                                
                            }}
                        >Remove
                        </button>
                    </div>
                ),
            },
        ],
        []
    );

    if (isLoading) return 'Loading';
    if (errorMessage) return errorMessage;
    return (
        <div>
            <input
                style={{ margin: 20 }}
                type="text"
                placeholder="Search for pokemons"
                value={searchText}
                onChange={evt => setSearchText(evt.target.value)}
            />
            <Styles>
                <Table columns={columns} data={postsFiltered} />
            </Styles>
        </div>
    );
};

export default PostsPage;
