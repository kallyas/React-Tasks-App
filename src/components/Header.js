import React from 'react'
import Button from './Button'

function Header({ title, onAddBtn, showAdd }) {
    return (
        <header className='header'>
            <h1>{title}</h1>
            <Button 
            color={showAdd ? 'green': 'red'} 
            text={showAdd ? 'Add' : 'Close'}
            onClick={onAddBtn}/>
        </header>
    )
}

export default Header
