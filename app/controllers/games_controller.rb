class GamesController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

    def index
        games = Game.includes(:comments).all
      
        if session[:user_id].present?
          render json: games.as_json(include: :comments), status: :ok
        else
          render json: { errors: ["Unauthorized"] }, status: :unauthorized
        end
      end

    def show
        game = Game.find(params[:id])
      
        if session[:user_id].present?
          render json: game
        else
            render json: { errors: ["Unauthorized"] }, status: :unauthorized
        end
    end
      

    def create
        if session[:user_id].present?
            game = Game.create(game_params)
            
            if game.valid?
                render json: game
            else
                render json: { errors: game.errors.full_messages }, status: :unprocessable_entity
            end
        else
            render json: { errors: ["Unauthorized"] }, status: :unauthorized
        end
    end

    def update
        game = find_game
      
        if session[:user_id].present?
          game.update(game_params)
          render json: game
        else
          render json: { errors: ["Unauthorized"] }, status: :unauthorized
        end
    end
      
    def destroy
        game = find_game
      
        if session[:user_id].present?
          game.destroy
          head :no_content
        else
          render json: { errors: ["Unauthorized access"] }, status: :unauthorized
        end
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
