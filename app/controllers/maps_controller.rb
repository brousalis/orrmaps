class MapsController < ApplicationController
  respond_to :json

  def index
    if current_user
      map = current_user.map
      points = map.points.flatten.to_json
      render :json => {:map_id => map.id, :points => points}
    end
    render :json => {:points => []} if !current_user
  end

  def map
    map = Map.find(params[:id])
    points = map.points.flatten.to_json
    render :json => points
  end

  def show
    @user = User.new
    @server = Server.find_by_name(session[:server]) || Server.find_by_name("Jade Quarry")
    @map = Map.find(params[:id])
    @servers = servers
  end

  def update
    map = Map.find(params[:id])
    points = map.points.to_gmaps4rails
    render :json => points
  end

  def like
    map = Map.find_by_id(params[:map_id])
    if current_user && current_user.map != map
      if current_user.already_likes?(map)
        like = map.likes.find_by_user_id(current_user.id)
        like.destroy
        render :json => { "status" => "failure", "count" => map.likes.count }
      else
        like = Like.create(:map => map, :user => current_user)
        if like
          render :json => { "status" => "success", "count" => map.likes.count }
        else
          render :json => { "status" => "failure" }
        end
      end
    else
      render :json => { "status" => "own" }
    end
  end
 

end
