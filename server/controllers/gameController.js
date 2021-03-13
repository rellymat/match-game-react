import Game from '../models/gameSchema.js';

export const getGames = async (req, res) => {
  const { user, category } = req.params
  let games
  try {
    if (user !== 'guest') {
      if (category !== 'random')
        games = await Game.find({ owner: user, category: category })
      else
        games = await Game.find({ owner: user})
    }
    else{
      if (category !== 'random')
        games = await Game.find({ owner: 'admin', category: category })
      else
        games = await Game.find({ owner: 'admin'})
    }
    res.status(200).json(games)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getGame = async (req, res) => {
  try {
    const game = await Game.findById(req.params.gameID)
    res.status(200).json(game)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const deleteGame = async (req, res) => {
  const game = await Game.findByIdAndRemove(req.params.id);

  if (!game)
    return res.status(404).send("The game with the given ID was not found.");

  res.send(game);

}

export const deleteCategory = async (req, res) => {
  const user = req.user.user
  const game = await Game.deleteMany({ category: req.params.name, owner: user });

  if (!game)
    return res.status(404).send("The game with the given ID was not found.");

  res.send(game);

}

export const deleteUser = async (req, res) => {
  const user = req.user.user
  const game = await Game.deleteMany({ owner: user });

  if (!game)
    return res.status(404).send("The game with the given ID was not found.");

  res.send(game);

}



export const getCategories = async (req, res) => {
  const user = req.user.user
  try {
    const categories = await Game.find({ owner: user }).select('category -_id').distinct('category')
    res.status(200).json(categories)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getCategoriesGuest = async (req, res) => {
  try {
    const categories = await Game.find({ owner: 'admin' }).select('category -_id').distinct('category')
    res.status(200).json(categories)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const postGame = async (req, res) => {
  const game = req.body;
  const newGame = new Game({
    owner: game.owner,
    category: game.category,
    items_1: game.items_1,
    items_2: game.items_2,
    items_3: game.items_3,
    items_4: game.items_4
  })
  try {
    await newGame.save()
    res.status(201).send(game)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

export const updateGame = async (req, res) => {
  const game = await Game.findByIdAndUpdate(
    req.params.id,
    {
      owner: req.body.owner,
      category: req.body.category,
      items_1: req.body.items_1,
      items_2: req.body.items_2,
      items_3: req.body.items_3,
      items_4: req.body.items_4
    },
  );

  if (!game)
    return res.status(404).send("The game with the given ID was not found.");

  res.status(200).send(game);
}

