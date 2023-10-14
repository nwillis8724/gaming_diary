class UsersController < ApplicationController

    def create
        user = User.create(user_params)
        if user.valid?
            sessions[:user_id] = user.id
            render json: user, status: :created
        else
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def show 
        user = User.find(params[:id])

        render json: user
    end

    def index
        users = User.all

        render json: users
    end

    def update

    end

    def destroy

    end
end
