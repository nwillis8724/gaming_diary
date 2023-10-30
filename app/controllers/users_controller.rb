class UsersController < ApplicationController

    def create
        user = User.create(user_params)

        if user.save
            session[:user_id] = user.id
            render json: user, status: :created
        else
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def show
        if session[:user_id].present?
          user = User.find_by(id: session[:user_id])
          if user
            render json: user
          else
            render json: { errors: ["User not found"] }, status: :not_found
          end
        else
          render json: { errors: ["Unauthorized"] }, status: :unauthorized
        end
    end

    def destroy
        user = User.find(params[:id])
        user.destroy
        head :no_content
    end

    def update
      if session[:user_id].present?
        user = User.find_by(id: session[:user_id])
        if user
          if user.update(user_params)
            render json: user
          else
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
          end
        else
          render json: { errors: ["User not found"] }, status: :not_found
        end
      else
        render json: { errors: ["Unauthorized"] }, status: :unauthorized
      end
    end
    
    private

    def user_params
      params.permit(:username, :password)
    end
end
