class ApplicationController < ActionController::API
  include ActionController::Cookies


    def authorize 
      return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
    end

    private 

    def current_user
      @current_user ||= User.find_by(id: session[:user_id])
    end
  
    def current_game
      @current_game ||= Game.find(params[:game_id]) if params[:game_id]
    end

end
