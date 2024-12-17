export const createList = async (req, res, next) => {
    try {
      const { title, games } = req.body;
      res.status(201).json({ message: 'List created successfully', list: { title, games } });
    } catch (error) {
      next(error);
    }
  };
  
  export const editList = async (req, res, next) => {
    try {
      const { listId } = req.params;
      const { title, games } = req.body;
      res.status(200).json({ message: 'List updated successfully', list: { listId, title, games } });
    } catch (error) {
      next(error);
    }
  };
  
  export const deleteList = async (req, res, next) => {
    try {
      const { listId } = req.params;
      res.status(200).json({ message: 'List deleted successfully', listId });
    } catch (error) {
      next(error);
    }
  };
  
  export const viewList = async (req, res, next) => {
    try {
      const { listId } = req.params;
      res.status(200).json({ message: 'List retrieved successfully', list: { listId } });
    } catch (error) {
      next(error);
    }
  };
  
  export const publishList = async (req, res, next) => {
    try {
      const { listId } = req.params;
      res.status(200).json({ message: 'List published successfully', listId });
    } catch (error) {
      next(error);
    }
  };
  