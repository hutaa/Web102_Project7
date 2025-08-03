import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import './CreatePokemon.css'; // Reusing create form styles

const EditPokemon = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pokemon, setPokemon] = useState({
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

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const { data, error } = await supabase
          .from('Pokemon')
          .select()
          .eq('id', id)
          .single();

        if (error) throw error;

        setPokemon({
          ...data,
          types: Array.isArray(data.types) ? data.types.join(', ') : '',
        });
      } catch (err) {
        console.error('Error fetching Pokémon:', err);
        setError('Failed to load Pokémon data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemon();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPokemon((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Convert comma-separated string to array
      const typesArray = pokemon.types
        .split(',')
        .map((t) => t.trim().toLowerCase())
        .filter((t) => t.length > 0);

      const updatePayload = {
        name: pokemon.name,
        nickname: pokemon.nickname || null,
        level: Number(pokemon.level) || 1,
        hp: Number(pokemon.hp) || 0,
        attack: Number(pokemon.attack) || 0,
        defense: Number(pokemon.defense) || 0,
        category: pokemon.category || null,
        sprite: pokemon.sprite || null,
        types: pokemon.types
          ? pokemon.types.split(',').map((type) => type.trim().toLowerCase())
          : [],
        updated_at: new Date().toISOString(),
      };

      console.log("🔁 Updating with values:", updatePayload);

      const { error } = await supabase
        .from('Pokemon')
        .update(updatePayload)
        .eq('id', id);

      if (error) {
        console.error("🛑 Supabase update error:", error.message, error.details);
        throw error;
      }

      navigate('/read');
    } catch (err) {
      console.error('Update error:', err);
      setError('Failed to update Pokémon');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading Pokémon data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button onClick={() => navigate('/read')} className="back-btn">
          Back to List
        </button>
      </div>
    );
  }

  return (
    <div className="create-pokemon-container">
      <h2>Edit Pokémon</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name*</label>
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
            <label>Level*</label>
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
            <label>HP*</label>
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
            <label>Attack*</label>
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
            <label>Defense*</label>
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

        {error && <p className="form-error">{error}</p>}

        <div className="form-actions">
          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? 'Updating...' : 'Update Pokémon'}
          </button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate('/read')}
            disabled={isLoading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPokemon;
