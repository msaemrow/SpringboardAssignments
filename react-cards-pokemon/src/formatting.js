export const formatPlayingCardData = (responseData) => {
    return{
        image: responseData.cards[0].image
    }
}

export const formatPokemonData = (responseData) => {
    return {
      front: responseData.sprites.front_default,
      back: responseData.sprites.back_default,
      name: responseData.name,
      stats: responseData.stats.map(stat => ({
        name: stat.stat.name,
        value: stat.base_stat
      }))
    };
  };