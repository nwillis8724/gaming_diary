# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


User.create(
  username: "gamer123",
  password_digest: BCrypt::Password.create("password123")
)


Game.create(
  title: "The Legend of Zelda: Breath of the Wild",
  genre: "Action-Adventure",
  platform: "Nintendo",
  release_date: "May 2023"
)


Comment.create(
  text: "This game is amazing! Highly recommended!",
  rating: 5,
  user: User.find_by(username: "gamer123"),
  game: Game.find_by(title: "The Legend of Zelda: Breath of the Wild")
)

User.create(
  username: "gamerGF",
  password_digest: BCrypt::Password.create("gamingcutie")
)


Game.create(
  title: "The Sims 4",
  genre: "Sim",
  platform: "All",
  release_date: "September 2014"
)


Comment.create(
  text: "This game is so fun!",
  rating: 5,
  user: User.find_by(username: "gamerGF"),
  game: Game.find_by(title: "The Sims 4")
)


User.create(
  username: "bigGuy",
  password_digest: BCrypt::Password.create("realtough")
)


Game.create(
  title: "Stardew Valley",
  genre: "Sim",
  platform: "All",
  release_date: "February 2016"
)


Comment.create(
  text: "This game is so cozy!",
  rating: 5,
  user: User.find_by(username: "bigGuy"),
  game: Game.find_by(title: "Stardew Valley")
)

