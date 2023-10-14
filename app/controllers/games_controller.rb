class GamesController < ApplicationController

    def index
        games = Game.all
        render json: games
    end

    def show
        game = Game.find(params[:id])
        render json: game
    end

    def create

    end

    def update

    end

    def destroy

    end
end
