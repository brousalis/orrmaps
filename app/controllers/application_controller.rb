class ApplicationController < ActionController::Base
  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def fetch_rated_maps!(server)
    @rated = Rails.cache.fetch("servers/#{server.id}/maps", :expires_in => 5.minutes) do
      #Map.find_all_by_server_id(server.id, :include => [:points, :likes]).sort_by { |m| [ m.likes.count, m.points.count, m.updated_at ] }.reverse
      User.includes(:map).where(:server_id => server.id)
    end
    
    @like_counts, @point_counts = Rails.cache.fetch("servers/#{server.id}/counts", :expires_in => 5.minutes) do
      map_ids = @rated.map(&:map_id)
      like_counts = cache_counts(Like.where(:map_id => map_ids))
      point_counts = cache_counts(Point.where(:map_id => map_ids))

      [like_counts, point_counts]
    end
  end

  def cache_counts(rel, key="map_id")
    rel.select("#{key}, COUNT(*) as count").group(key).inject({}) do |cache, item|
      cache.merge(item.send(key) => item.count.to_i)
    end
  end

  def servers
    Rails.cache.fetch("servers/all/sorted", :expires_in => 9999.minutes) do
      Server.find(:all).group_by { |server| server.country }
    end
  end

  def underscore(server)
    return server.downcase.strip.gsub(' ', '_').gsub(/[^\w-]/, '')
  end  
end
