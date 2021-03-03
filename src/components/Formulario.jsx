import React, {useState, useEffect} from 'react'
import {db} from '../firebaseconfig'

const Formulario = () => {

    const [editMode, setEditMode] = useState(null)
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [users, setUsers] = useState([])
    const [error, setError] = useState(null)


    useEffect(() =>
    {
        const getUsuarios = async () =>
        {
            const {docs} = await db.collection('agenda').get()
            const newArray = docs.map( item => ({id:item.id, ...item.data()}))
            setUsers(newArray)
        }
        getUsuarios()
    },[])

    const setUsuario = async (e) =>
    {   
        e.preventDefault()
        if(!name.trim())
        {
            setError('El campo nombre esta vacio')
        }
        if(!phone.trim())
        {
            setError('El campo telefono esta vacio')
        }

        const usuario =
        {
            name: name,
            phone: phone
        }

        try
        {
            const data = await db.collection('agenda').add(usuario)
            console.log('Tarea añadida')
            const {docs} = await db.collection('agenda').get()
            const newArray = docs.map( item => ({id:item.id, ...item.data()}))
            setUsers(newArray)
        }
        catch(e)
        {
            console.log(e)
        }
        setName('')
        setPhone('')

    }

    const deleteUser = async (id) =>
    {
        try
        {
            await db.collection('agenda').doc(id).delete()
            const {docs} = await db.collection('agenda').get()
            const newArray = docs.map( item => ({id:item.id, ...item.data()}))
            setUsers(newArray)
        }
        catch(e)
        {
            console.log(e)
        }
    }

    const actualizar = async (id) =>
    {
        try
        {
            const data = await db.collection('agenda').doc(id).get()
            const {name, phone} = data.data()
            setName(name)
            setPhone(phone)
            setId(id)
            setEditMode(true)
        }
        catch(e)
        {
            console.log(e)
        }
    }

    const setUpdate = async (e) =>
    {
        e.preventDefault()
        if(!name.trim())
        {
            setError('El campo nombre esta vacio')
        }
        if(!phone.trim())
        {
            setError('El campo telefono esta vacio')
        }

        const userUpdate =
        {
            name: name,
            phone: phone
        }

        try
        {
            await db.collection('agenda').doc(id).set(userUpdate)
            const {docs} = await db.collection('agenda').get()
            const newArray = docs.map( item => ({id:item.id, ...item.data()}))
            setUsers(newArray)
        }
        catch(e)
        {
            console.log(e)
        }
        setName('')
        setPhone('')
        setId('')
        setEditMode(false)
    }

    return (
        <div className="container">
        <div className="row">
          <div className="col">
            <h2>Formulario de usuarios</h2>
            <form className="form-group"
            onSubmit={editMode ? setUpdate : setUsuario}>
              <input
              value={name}
              onChange={ (e) => setName(e.target.value)}
              className="form-control" 
              placeholder="Introduce el nombre"
              type="text"/>
              <input
              value={phone}
              onChange={ (e) => setPhone(e.target.value)}
              className="form-control mt-3" 
              placeholder="Introduce el numero"
              type="text"/>
              {
                  editMode ?
                  (
                    <input 
                    className="btn btn-dark btn-block mt-3"
                    value="Editar"
                    type="submit"/> 
                  )
                  :
                  (
                    <input 
                    className="btn btn-dark btn-block mt-3"
                    value="Registrar"
                    type="submit"/>
                  )
              }

            </form>
            {
                error ?
                (
                    <div>
                        <p>{error}</p>
                    </div>
                )
                :
                (
                    <span></span>
                )
            }
          </div>
          <div className="col">
              <h2>Lista de tu agenda</h2>
                <ul className="list-group">
                {      
                    users.length !== 0 ?
                    (
                        users.map(item =>(
                            <li className="list-group-item" key={item.id}>{item.name} -- {item.phone}
                            <button onClick={(id) => {deleteUser(item.id)}} className="btn btn-danger float-right">Delete</button>
                            <button onClick={(id) => {actualizar(item.id)}}className="btn btn-info mr-3 float-right">Actualizar</button>
                            </li>
                        ))
                    )
                    :
                    (
                        <span>No hay usuarios en tu agenda</span>
                    )
                }
                </ul>
          </div>
        </div>
      </div>
    )
}

export default Formulario
