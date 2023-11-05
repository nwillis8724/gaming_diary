class GamesController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    before_action :authorize


    def index
      games = Game.includes(comments: :user).all
      render json: games.as_json(
        include: {
          comments: {
            include: :user
          }
        }
      ), status: :ok
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

    def authorize 
      return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
    end

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
