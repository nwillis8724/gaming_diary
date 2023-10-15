class GamesController < ApplicationController

    def index
        games = Game.includes(:comments).all
        render json: games, include: :comments
    end

    def show
        game = Game.find(params[:id])
        render json: game
    end

    def create
        if session[:user_id].present?
            game = Game.create(game_params)
            
            if game.valid?
                render json: game
            else
                render json: { errors: game.errors.full_messages }, status: :unprocessable_entity
            end
    end

    def update

    end

    def destroy

    end

    private

    def game_params
        params.permit(:title, :platform, :genre, :release_date)
    end
end
