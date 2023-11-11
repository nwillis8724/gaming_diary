class CommentsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
     before_action :authorize, only: [:update, :destroy]
    before_action :set_comment, only: [:update, :destroy]
    before_action :check_owner, only: [:update, :destroy]

    def create
      user = current_user
      comment = user.comments.build(comment_params)
    
      if comment.save
        render json: comment, status: :created
      else
        render json: { errors: comment.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    def show
      comment = Comment.find(params[:id])
      render json: comment, include: { user: { only: :username } }, serializer: CommentSerializer
    end
  
    def show
      comment = Comment.find(params[:id])
      render json: comment, include: { user: { only: :username } }, serializer: CommentSerializer
    end
  
    # def update
    #     if @comment.update(comment_params)
    #       render json: @comment, serializer: CommentSerializer
    #     else
    #       render json: { errors: @comment.errors.full_messages }, status: :unprocessable_entity
    #     end
    #   end
    
      def destroy
        @comment.destroy
        head :no_content
      end
    
      private
    
      def set_comment
        @comment = Comment.find(params[:id])
      end
    
      def check_owner
        unless @comment.user == current_user
          render json: { error: "You are not authorized to perform this action" }, status: :unauthorized
        end
      end
  
    def comment_params
      params.require(:comment).permit(:text, :rating, :game_id)
    end
  
    def find_comment
      comment = Comment.find(params[:id])
    end
  
    def render_not_found_response
      render json: { error: "Comment not found" }, status: :not_found
    end
  end
  