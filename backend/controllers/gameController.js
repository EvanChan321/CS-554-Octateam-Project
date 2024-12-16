/**
 * Get a list of all games (this could use the RAWG API)
 */
const getAllGames = async (req, res) => {
    try {
      // Simulating a list of games (this would be fetched from RAWG API)
      const games = [
        { id: 1, title: 'The Legend of Zelda: Breath of the Wild' },
        { id: 2, title: 'Elden Ring' },
        { id: 3, title: 'Super Mario Odyssey' }
      ];
  
      res.status(200).json({ message: 'Games retrieved successfully', games });
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving games', error: error.message });
    }
  };
  
  /**
   * Add a comment to a specific game
   */
  const addGameComment = async (req, res) => {
    try {
      const { gameId } = req.params;
      const { comment } = req.body;
  
      // Here, you'd store the comment in a database
      res.status(201).json({ message: 'Comment added successfully', gameId, comment });
    } catch (error) {
      res.status(500).json({ message: 'Error adding comment', error: error.message });
    }
  };
  
  module.exports = { getAllGames, addGameComment };
  