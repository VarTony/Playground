/**
 * BST - Binary Search Tree или Бинарное дерево поиска, иерархическая структура
 *  данных представляющая из себя простейшешую форму древовидных структур.
 *  Каждый узел состоит из 3х полей:
 *   data - данные. (В данной реализации число)
 *   left - узел, в качестве данных которого меньшее значение, чем у родительского узла.
 *   right - узел, в качестве данных которого меньшее значение, чем у родительского узла.
 * 
 *    Данная реализация имеет несколько процедур для  самообслуживания:
 *      setData(num: number) - Добавление нового элемента в дерево.(Л-Рекурсия)
 *      getData(num: number) - Поиск и проверка содержания заданного элемента.(Л-Рекурсия)
 *      getBiggest(void) - Нахождение наибольшего элемента в структуре.(Л-Рекурсия)
 *      getSmaller(void) - Нахождение наименьшего элемента в структуре.(Л-Рекурсия)
 *      inOrder(void) - Возвращает отсортированный в порядке возрастания 
 *          список всех элементов дерева.(К-Рекурсия)
 *      getTree(void) - Возвращает полную копию дерева, в его текущем состоянии.
 *      getAllBranches(void) - Нахождение всех ветвей дерева(От корня до листового узла).(К-Рекурсия)
        getDeep(void) - Нахождение глубины дерева(Колличество узлов самой длиной ветви).
 * 
 */
const BST = () => {
    const tree = {};
    
    const setData = (num, t=tree) => {
    if(t.data === num) return { ...tree };  
    if(t.data === undefined) {
        t.left = {};
        t.right = {};
        t.data = num;
        return { ...tree };
      }
      if(num < t.data) return setData(num, t.left);
      if(num > t.data) return setData(num, t.right);
    }
    
    
    const getData = (num, t=tree) => {
      if(t.data === undefined) return null;
      if(t.data === num) return t.data;
      if(t.data < num) return getData(num, t.right);
      if(t.data > num) return getData(num, t.left);
    }
    

    const _isEmptyNode = node => node.data === undefined;


    const _getAllBranches = (bst, path = []) => {
      if (_isEmptyNode(bst)) return [];
      const road = [ ...path, bst.data ];
      if (_isEmptyNode(bst.left) && _isEmptyNode(bst.right)) return [ road ];
  
      return [ 
          ..._getAllBranches(bst.left, road),
          ..._getAllBranches(bst.right, road)
      ]
    }

    const getAllBranches = () => _getAllBranches(tree);


    const getDeep = () => getAllBranches()
      .reduce((deep, branch) => branch.length > deep ? branch.length : deep, 0);
  

    const getBiggest = (t=tree) => (t.right.data !== undefined)
      ? getBiggest(t.right)
      : t.data;
  
    
    const getSmaller = (t=tree) => (t.left.data !== undefined) 
      ? getSmaller(t.left)
      : t.data;
  
    
    const inOrder = (list=[], t={...tree}) => {
      if(t.data === undefined) return [...list];
      if(t.left.data === undefined) return [...list, t.data];
      
      return [
        ...inOrder(list, t.left),
        t.data,
        ...inOrder(list, t.right),
      ];
    }
  
    
    const getTree = () => ({ ...tree });

    return { 
      setData,
      getData,
      getTree,
      getBiggest,
      getSmaller,
      inOrder,
      getAllBranches,
      getDeep
    }
  }
  
  
  // Реализация и тестирование:
  const myTree = BST();
  
  myTree.setData(75);
  myTree.setData(25);
  myTree.setData(50);
  myTree.setData(125);
  myTree.setData(33);
  myTree.setData(10);
  myTree.setData(100);
  myTree.setData(61);
  console.log(myTree.getData(5)); // null.
  console.log(myTree.getSmaller()); // 10.
  console.log(myTree.getTree()); // Копия дерева.
  console.log(myTree.inOrder()); //[ 10, 25, 33, 50, 61, 75, 100, 125 ]
  