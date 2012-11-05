class MapsController < ApplicationController
  respond_to :json

  def index
    if current_user
      map = current_user.map
      points = Point.includes(:note).where(:map_id => map.id)
      data = points.collect { |point| point.to_hash }.to_json
      render :json => {:map_id => map.id, :points => data}
    end
    render :json => {:points => []} if !current_user
  end

  def map
    points = Point.includes(:note).where(:map_id => params[:id])
    data = points.collect { |point| point.to_hash }.to_json
    render :json => data
  end

  def show
    @server = find_server(session[:server] || "Jade Quarry")
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
