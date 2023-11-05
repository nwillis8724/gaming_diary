class SessionsController < ApplicationController
  before_action :authorize, except: :create

  def create
    user = User.find_by(username: params[:username])
  
    if user.nil?
      render json: { error: "Invalid Username" }, status: :unauthorized
    elsif user&.authenticate(params[:password])
      session[:user_id] = user.id
      render json: user, status: :created
    else
      render json: { error: "Invalid Password" }, status: :unauthorized
    end
  end

  def destroy
    session.delete(:user_id)
    head :no_content
  end

  private 

  def authorize 
    return render json: { error: "Not authorized" }, status: :unauthorized unless session.include?(:user_id)
  end
end