class CommentsController < ApplicationController
rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
before_action :authorize


    def index
        comments = Comment.includes(:user).all
        render json: comments.as_json(include: :user), status: :ok
    end

    def show
        comment = Comment.find(params[:id])
        render json: comment
    end

    def create
        comment = Comment.create(comment_params)       
            if comment.valid?
                render json: comment
            else
                render json: { errors: comment.errors.full_messages }, status: :unprocessable_entity
            end
    end

    def update
        comment = find_comment
        comment.update(comment_params)
        render json: comment
    end

    def destroy
        comment = find_comment
        comment.destroy
        head :no_content
    end

    private

    def authorize 
        return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
      end

    def comment_params
        params.permit(:text, :rating, :game_id, :user_id)
    end

    def find_comment
        comment = Comment.find(params[:id])
    end

    def render_not_found_response
        render json: { error: "Comment not found" }, status: :not_found
      end
end
