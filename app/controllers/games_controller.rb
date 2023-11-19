class GamesController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
  # before_action :authorize, except: [:index, :reviews_by_genre]


  def index
    games = Game.includes(comments: :user)
    render json: games
  end

  def show
    game = Game.includes(comments: [:user]).find(params[:id])
    render json: game
  end

  def create
    game = Game.create(game_params)
    if game.valid?
      render json: game
    else
      render json: { errors: game.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    game = find_game
    game.update(game_params)
    render json: game
  end

  def destroy
    game = find_game
    game.destroy
    head :no_content
  end

  private

  def game_params
    params.permit(:title, :platform, :genre, :release_date, :image)
  end

  def find_game
    game = Game.find(params[:id])
  end

  def render_not_found_response
    render json: { error: "Game not found" }, status: :not_found
  end
end