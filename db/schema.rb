# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130225005301) do

  create_table "maps", :force => true do |t|
    t.datetime "updated"
    t.integer  "user_id"
    t.integer  "likes_id"
    t.integer  "server_id"
    t.integer  "point_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "notes", :force => true do |t|
    t.string   "content"
    t.integer  "point_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "points", :force => true do |t|
    t.float    "latitude",   :null => false
    t.float    "longitude",  :null => false
    t.string   "marker_id",  :null => false
    t.integer  "map_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.string   "icon"
    t.integer  "note_id"
  end

  add_index "points", ["map_id"], :name => "map_id_points_ix"

  create_table "servers", :force => true do |t|
    t.string   "name",       :null => false
    t.string   "country",    :null => false
    t.integer  "user_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "users", :force => true do |t|
    t.string   "name",                         :null => false
    t.string   "password_hash",                :null => false
    t.string   "password_salt",                :null => false
    t.integer  "map_id"
    t.integer  "server_id"
    t.datetime "created_at",                   :null => false
    t.datetime "updated_at",                   :null => false
    t.string   "email"
    t.string   "twitter"
    t.integer  "donor",         :default => 0
  end

end
