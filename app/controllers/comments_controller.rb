class CommentsController < ApplicationController
rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

    def index
        comments = Comment.all
        
        if session[:user_id].present?
            render json: comments.as_json, status: :created
        else 
            render json: { errors: ["Unauthorized"]}, status: :unauthorized
        end
    end

    def show
        comment = Comment.find(params[:id])
        
        if session[:user_id].present?
            render json: comment
        else
            render json: { errors: ["Unauthorized"] }, status: :unauthorized
        end
    end

    def create
        if session[:user_id].present?
            comment = Comment.create(game_params)
            
            if comment.valid?
                render json: comment
            else
                render json: { errors: comment.errors.full_messages }, status: :unprocessable_entity
            end
        else
            render json: { errors: ["Unauthorized"] }, status: :unauthorized
        end
    end

    def update
        comment = find_comment

        if session[:user_id].present?
            comment.update(comment_params)
            render json: comment
        else
            render json: { errors: ["Unauthorized"] }, status: :unauthorized
        end
    end

    def destroy
        comment = find_comment

        if session[:user_id].present?
            comment.destroy
            head :no_content
        else
            render json: { errors: ["Unauthorized"] }, status: :unauthorized
        end
    end

    private

    def comment_params
        params.permit(:text, :rating)
    end

    def find_comment
        comment = Comment.find(params[:id])
    end

    def render_not_found_response
        render json: { error: "Comment not found" }, status: :not_found
      end
end
