import React from 'react';
import { Link } from 'react-router-dom';
import './PokeCard.css';

const PokeCard = ({ pokemon, onEdit, onDelete }) => {
  const typesArray = Array.isArray(pokemon.types)
    ? pokemon.types
    : pokemon.types
      ? pokemon.types.split(',').map(type => type.trim())
      : [];
  
  const primaryType = typesArray[0] || 'normal';
  const createdDate = pokemon.createdAt 
    ? new Date(pokemon.createdAt).toLocaleDateString() 
    : 'Just now';

  return (
    <div className={`poke-card type-${primaryType}`}>
      <div className="pokemon-id">#{pokemon.id?.toString().slice(0, 8)}</div>
      
      <div className="pokemon-name">{pokemon.nickname || pokemon.name}</div>
      
      <div className="type-container">
        {typesArray.map((type, index) => (
          <div key={index} className={`type-badge type-${type.toLowerCase()}`}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </div>
        ))}
      </div>


      
      <div className="pokemon-image-container">
        <img
          src={pokemon.sprite || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png'}
          alt={pokemon.name}
          className="pokemon-image"
        />
      </div>
      
      <div className="pokemon-stats">
        <div className="stat-row">
          <span>LVL</span>
          <span className="stat-value">{pokemon.level || '--'}</span>
        </div>
        <div className="stat-row">
          <span>HP</span>
          <span className="stat-value">{pokemon.hp || '--'}</span>
        </div>
        <div className="stat-row">
          <span>ATK</span>
          <span className="stat-value">{pokemon.attack || '--'}</span>
        </div>
        <div className="stat-row">
          <span>DEF</span>
          <span className="stat-value">{pokemon.defense || '--'}</span>
        </div>
      </div>
      
      <div className="pokemon-meta">
        <div className="pokemon-category">{pokemon.category || 'Unknown'}</div>
        <div className="pokemon-date">Created: {createdDate}</div>
      </div>

      <div className="card-actions">
        <Link to={`/edit/${pokemon.id}`} className="edit-btn">
            <i className="fas fa-edit"></i> Edit Poké
        </Link>
        <Link to={`/delete/${pokemon.id}`} className="delete-btn">
            <i className="fas fa-trash"></i> Delete Poké
        </Link>
      </div>
    </div>
  );
};

export default PokeCard;