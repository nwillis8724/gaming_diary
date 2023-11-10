class UsersController < ApplicationController
  before_action :authorize, only: [:show, :update, :destroy]

  def create
    user = User.create(user_params)

    if user.save
      session[:user_id] = user.id
      render json: user, serializer: UserSerializer, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    if session[:user_id].present?
      user = User.find_by(id: session[:user_id])
      if user
        render json: user, serializer: UserSerializer
      else
        user_not_found
      end
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
          render json: user, serializer: UserSerializer
        else
          render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
      else
        user_not_found
      end
    end
  end

  private

  def user_not_found
    render json: { errors: ["User not found"] }, status: :not_found
  end

  def user_params
    params.permit(:username, :password)
  end
end