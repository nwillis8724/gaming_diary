class SessionsController < ApplicationController
    def create
        user = User.find_by(username: params[:username])
        if user.nil?
            render json: { errors: ["Invalid Username"] }, status: :unauthorized
        elsif user&.authenticate(params[:password])
          session[:user_id] = user.id
          render json: user, status: :created
        else
          render json: { errors: user.errors.full_messages }, status: :unauthorized
        end
    end

    def destroy
        if session[:user_id].present?
          session.delete(:user_id)
          head :no_content
        else
          render json: { errors: ["Not logged in"] }, status: :unauthorized
        end
      end
end