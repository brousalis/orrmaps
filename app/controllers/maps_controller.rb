class MapsController < ApplicationController
  respond_to :json

  before_filter :valid_map?, :only => :show

  def index
    if current_user
      map = current_user.map
      points = Point.includes(:note).where(:map_id => map.id)
      render :json => { :map_id => map.id, :points => points.map(&:to_hash) }
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

  def dislike
    map = Map.find_by_id(params[:map_id])

    if current_user && current_user.try(:map) != map
      map.dislike(current_user)
      render :json => { "status" => "success", "count" => map.likes }
    else
      render :json => { "status" => "own" }
    end
  end

  def like
    map = Map.find_by_id(params[:map_id])

    if current_user && current_user.try(:map) != map
      map.like(current_user)
      render :json => { "status" => "success", "count" => map.likes }
    else
      render :json => { "status" => "own" }
    end
  end

private

  def valid_map?
    @server = find_server(session[:server] || "Jade Quarry")
    render "404", :layout => "error" unless Map.find_by_id(params[:id])
  end 
end
