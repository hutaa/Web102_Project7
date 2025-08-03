import { useState } from 'react';
import { supabase } from '../client';
import './CreatePokemon.css';

const CreatePokemon = () => {
  const [pokemon, setPokemon] = useState({
    name: '',
    nickname: '',
    level: '',
    hp: '',
    attack: '',
    defense: '',
    category: '',
    sprite: '',
    types: '', // will store comma-separated input, then convert to array
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPokemon((prev) => ({ ...prev, [name]: value }));
  };

  const createPokemon = async (e) => {
    e.preventDefault();

    // Convert comma-separated string to array, trim spaces
    const typesArray = pokemon.types.split(',').map((t) => t.trim().toLowerCase());

    const { data, error } = await supabase.from('Pokemon').insert([
      {
        name: pokemon.name,
        nickname: pokemon.nickname,
        level: Number(pokemon.level),
        hp: Number(pokemon.hp),
        attack: Number(pokemon.attack),
        defense: Number(pokemon.defense),
        category: pokemon.category,
        sprite: pokemon.sprite,
        types: typesArray,
      },
    ]);

    if (error) {
      console.error('Insert error:', error);
    } else {
      console.log('Pokemon inserted:', data);
      // Clear form
      setPokemon({
        name: '',
        nickname: '',
        level: '',
        hp: '',
        attack: '',
        defense: '',
        category: '',
        sprite: '',
        types: '',
      });
    }
  };

  return (
    <div className="create-pokemon-container">
      <h2>Create New Pokémon</h2>
      <form onSubmit={createPokemon}>
        <div className="form-group">
          <label>Name *</label>
          <input 
            name="name" 
            value={pokemon.name} 
            onChange={handleChange} 
            required 
            placeholder="Pikachu"
          />
        </div>

        <div className="form-group">
          <label>Nickname</label>
          <input 
            name="nickname" 
            value={pokemon.nickname} 
            onChange={handleChange} 
            placeholder="Sparky"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Level *</label>
            <input 
              type="number" 
              name="level" 
              value={pokemon.level} 
              onChange={handleChange} 
              min="1" 
              max="100" 
              required
            />
          </div>

          <div className="form-group">
            <label>HP *</label>
            <input 
              type="number" 
              name="hp" 
              value={pokemon.hp} 
              onChange={handleChange} 
              min="1" 
              max="255" 
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Attack *</label>
            <input 
              type="number" 
              name="attack" 
              value={pokemon.attack} 
              onChange={handleChange} 
              min="1" 
              max="255" 
              required
            />
          </div>

          <div className="form-group">
            <label>Defense *</label>
            <input 
              type="number" 
              name="defense" 
              value={pokemon.defense} 
              onChange={handleChange} 
              min="1" 
              max="255" 
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Category</label>
          <input 
            name="category" 
            value={pokemon.category} 
            onChange={handleChange} 
            placeholder="Starter"
          />
        </div>

        <div className="form-group">
          <label>Sprite URL</label>
          <input 
            name="sprite" 
            value={pokemon.sprite} 
            onChange={handleChange} 
            placeholder="https://example.com/pikachu.png"
          />
        </div>

        <div className="form-group">
          <label>Types* (comma separated)</label>
          <input 
            name="types" 
            value={pokemon.types} 
            onChange={handleChange} 
            placeholder="electric, flying" 
            required
          />
        </div>

        <button type="submit" className="submit-btn">Create Pokémon</button>
      </form>
    </div>
  );
};

export default CreatePokemon;