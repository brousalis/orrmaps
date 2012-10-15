class MapsController < ApplicationController
  respond_to :json

  def index
    if current_user
      @map = Map.find_or_create_by_created_at(Date.today.to_s)
      @map.user = current_user
      @map.save
      @points = @map.points.to_gmaps4rails
    end

    respond_with @points
  end

  def like
    @map = Map.find(params[:map_id])
    if current_user.already_likes?(@map)
      @like = @map.likes.find_by_user_id(current_user.id)
      @like.destroy
      render :json => { "status" => "failure", "count" => @map.likes.count }
    else
      @like = Like.create(:map => @map, :user => current_user)
      if @like
        render :json => { "status" => "success", "count" => @map.likes.count }
      else
        render :json => { "status" => "failure" }
      end
    end
  end
 

end
