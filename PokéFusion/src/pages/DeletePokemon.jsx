import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import './DeletePokemon.css';

const DeletePokemon = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const deletePokemon = async () => {
      const { error } = await supabase
        .from('Pokemon')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Delete error:', error);
      } else {
        navigate('/read'); // Redirect after deletion
      }
    };

    // Confirm before deleting
    const confirmed = window.confirm('Are you sure you want to delete this Pokémon?');
    if (confirmed) {
      deletePokemon();
    } else {
      navigate('/read'); // Go back if not confirmed
    }
  }, [id, navigate]);

  return null; // This component doesn't render anything
};

export default DeletePokemon;