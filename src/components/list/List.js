import {Lightning} from "wpe-lightning-sdk";
import Item from "../item";

export default class List extends Lightning.Component {
    static _template() {
        return {
            Items: {
                y: 120, forceZIndexContext: true, boundsMargin: [500, 100, 500, 100],
                transitions: {
                    x: {duration: .3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}
                }
            },
            Focus: {
                /**
                 * @ todo: Your goal is to add a focus indicator. Please take a look at the video
                 * and inspect the rectanle frame that's before the focused movie item.
                 * extra: Animate it a bit when the focus changes to the next item
                 */
                x: -15,
                y: 160,
                texture: lng.Tools.getRoundRect(200, 285, 15, 5, 0xCC30538a, false, 0xff00ffff)
            },
            Metadata: {
                /**
                 * @todo: Your goal is to add a component that have multiple text labels,
                 * 1 for the Title of the selected asset and 1 for the genre.
                 */
                Title: {
                    y: 10,
                    text: {
                        textColor: 0xccffffff,
                        text: '',
                        fontFace: 'SourceSansPro-Black',
                        fontSize: 40,
                    }
                },
                Genre: {
                    y: 55,
                    text: {
                        text: '',
                        fontFace: 'SourceSansPro-Regular',
                        fontSize: 26,
                    }
                }
            }
        }
    }

    _init() {
        this._index = 0;
        this._focus = this.tag('Focus');
        this._title = this.tag('Metadata.Title');
        this._genre = this.tag('Metadata.Genre');
    }

    _handleLeft(){
        this.setIndex(Math.max(0, --this._index));
    }

    _handleRight(){
        this.setIndex(Math.min(++this._index, this.items.length - 1));
    }

    _handleKey(event) {
        // The user is pressing any key that is not mapped, so we need to check and redraw
        this.setIndex(this._index);
    }

    /**
     * @todo:
     * Implement working setIndex method
     * that stores index and position movie component to focus
     * on selected item
     */
    setIndex(idx){
        // store new index
        this._index = idx;

        // update position
        this.tag("Items").setSmooth("x",  idx * -220 );

        this._focus.patch({
            smooth: {
                x: -35,
                y: 115,
                texture: lng.Tools.getRoundRect(240, 350, 10, 5, 0xCC30538a, false, 0xff00ffff)
            }
        });

        // With this way, because we have the movies data on the this._movies
        // and we know the index where we are
        // we can update the properties of the objects (title and genre)
        // without using signals or so
        // So.. if you want to use at this way (I guess is faster)
        // uncomment the next lines

        /** BEGIN UNCOMMENT */
        // if (this._movies[idx].title !== undefined) {
        //     this._title.text = this._movies[idx].title;
        // }

        // if (this._movies[idx].genres !== undefined) {
        //     this._genre.text = this._movies[idx].genres;
        // } else {
        //     this._genre.text = 'No genre found';
        // }
        /** END UNCOMENT */
    }

    set label(v) {
        // @todo: update list title
    }

    set movies(v) {
        // we add an array of object with type: Item
        this.tag("Items").children = v.map((movie, index)=>{
            return {
                type: Item,
                item: movie,
                x: index * (Item.width + Item.offset)
            };
        });

        // This is used to have on this item all the information
        // about all the movies that this list receive
        // so it can be used at setIndex with the index we have

        // If you want to use it, un comment it!
        // this._movies = v;
    }

    get items() {
        return this.tag("Items").children;
    }

    get activeItem() {
        return this.items[this._index];
    }

    _getFocused() {
        return this.activeItem;
    }

    $metadaHasChanged(item) {
        // I have solved the problem this resolves in other way but, let's do
        // in the way you want too
        
        // item has all the data sended by the item so, when fired we can update the template ;)
        // So, if you want to use the data stored by the this._movie "private" property
        // comment everything below ;)
        
        // Set texts
        if (item.title !== undefined) {
            this._title.text = item.title;
        }

        if (item.genres !== undefined) {
            this._genre.text = item.genres;
        } else {
            this._genre.text = 'No genre found';
        }
    }
}
